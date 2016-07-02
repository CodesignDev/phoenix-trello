defmodule PhoenixTrello.AuthView do
  use PhoenixTrello.Web, :view

  def render("show.json", %{token: token, user: user}) do
    %{
      token: token,
      user: user
    }
  end

  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end

end
