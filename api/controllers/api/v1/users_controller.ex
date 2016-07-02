defmodule PhoenixTrello.UsersController do
  use PhoenixTrello.Web, :controller

  alias PhoenixTrello.Repo
  alias PhoenixTrello.User

  plug Guardian.Plug.EnsureAuthenticated, [handler: PhoenixTrello.AuthController] when action in [:me]
  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)

        json conn, %{jwt: jwt, user: user}

      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", changeset: changeset)
    end
  end

  def me(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
