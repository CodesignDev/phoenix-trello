defmodule PhoenixTrello.Router do
  use PhoenixTrello.Web, :router

  pipeline :api do
    plug :accepts, ["json"]

    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", PhoenixTrello do
    pipe_through :api

    scope "/v1" do
      post "/users", UsersController, :create

      get "/users/me", UsersController, :me

      post "/auth", AuthController, :create
      delete "/auth", AuthController, :delete
    end
  end
end
