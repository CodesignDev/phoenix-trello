defmodule PhoenixTrello.BoardController do
  use PhoenixTrello.Web, :controller

  alias PhoenixTrello.Repo
  alias PhoenixTrello.Board

  plug Guardian.Plug.EnsureAuthenticated, handler: PhoenixTrello.AuthController

  def index(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    owned_boards = user
    |> assoc(:owned_boards)
    |> Board.preload_all
    |> Repo.all

    conn
    |> render("index.json", owned_boards: owned_boards)
  end

  def create(conn, %{"board" => board_params}) do
    user = Guardian.Plug.current_resource(conn)

    changeset = user
    |> build_assoc(:owned_boards)
    |> Board.changeset(board_params)

    case Repo.insert(changeset) do
      {:ok, board} ->
        conn
        |> put_status(:created)
        |> render("show.json", board: board)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changset: changeset)
    end
  end
end
