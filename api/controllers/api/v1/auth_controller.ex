defmodule PhoenixTrello.AuthController do
  use PhoenixTrello.Web, :controller

  plug :scrub_params, "auth" when action in [:create]

  def create(conn, %{"auth" => auth_params}) do
    case PhoenixTrello.Auth.authenticate(auth_params) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", token: jwt, user: user)
      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end

end
