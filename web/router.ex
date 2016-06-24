defmodule PhoenixTrello.Router do
  use PhoenixTrello.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PhoenixTrello do
    pipe_through :api
  end
end
