defmodule PhoenixTrello.BoardChannel do
  use PhoenixTrello.Web, :channel

  alias PhoenixTrello.User
  alias PhoenixTrello.Board
  alias PhoenixTrello.UserBoard

  def join("board:" <> board_id, _payload, socket) do
    board = get_current_board(socket, board_id)

    {:ok, %{board: board}, assign(socket, :board, board)}
  end

  def handle_in("members:add", %{"email" => email}, socket) do
    try do
      board = socket.assigns.board
      user = User
      |> Repo.get_by(email: email)

      changeset = user
      |> build_assoc(:user_boards)
      |> UserBoard.changeset(%{board_id: board.id})

      case Repo.insert(changeset) do
        {:ok, _board_user} ->
          broadcast! socket, "member:added", %{user: user}

          PhoenixTrello.Endpoint.broadcast_from! self(), "user:#{user.id}", "board:add", %{board: board}

          {:noreply, socket}
        {:error, _changeset} ->
          {:reply, {:error, %{error: "Error adding new member"}}, socket}
      end
    catch
      _, _ -> {:reply, {:error, %{error: "User does not exist"}}, socket}
    end
  end

  defp get_current_board(socket, board_id) do
    socket.assigns.current_user
    |> assoc(:owned_boards)
    |> Board.preload_all
    |> Repo.get(board_id)
  end
end
