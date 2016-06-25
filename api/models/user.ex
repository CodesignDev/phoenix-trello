defmodule PhoenixTrello.User do
  use PhoenixTrello.Web, :model

  schema "users" do
    field :username, :string
    field :display_name, :string
    field :email, :string
    field :encrypted_password, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :display_name, :email, :encrypted_password])
    |> validate_required([:username, :display_name, :email, :encrypted_password])
  end
end
