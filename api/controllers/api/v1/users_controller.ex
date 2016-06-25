defmodule PhoenixTrello.UsersController do
  use PhoenixTrello.Web, :controller

  alias PhoenixTrello.Repo
  alias PhoenixTrello.User

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)

        json conn, %{jwt: jwt, user: user}

      {:error, changeset} ->
        json conn, %{changeset: changeset}
    end
  end
end
