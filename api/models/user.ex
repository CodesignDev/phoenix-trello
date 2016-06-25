defmodule PhoenixTrello.User do
  use PhoenixTrello.Web, :model

  schema "users" do
    field :username, :string
    field :display_name, :string
    field :email, :string
    field :password, :string, virtual: true
    field :encrypted_password, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :display_name, :email, :password], [:encrypted_password])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:passowrd, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:username, message: "Username already in use")
    |> unique_constraint(:email, message: "Email already in use")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
