defmodule PhoenixTrello.UserChannel do
  use PhoenixTrello.Web, :channel

  def join("user:" <> _user_id, _payload, socket) do
    {:ok, socket}
  end
end
