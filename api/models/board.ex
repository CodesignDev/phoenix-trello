defmodule PhoenixTrello.Board do
  use PhoenixTrello.Web, :model

  @derive {Poison.Encoder, only: [:id, :name, :user, :members]}

  schema "boards" do
    field :name, :string
    belongs_to :user, PhoenixTrello.User

    has_many :user_boards, PhoenixTrello.UserBoard
    has_many :members, through: [:user_boards, :user]

    timestamps()
  end

  def preload_all(query) do
    from b in query, preload: [:user, :members]
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
