# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PhoenixTrello.Repo.insert!(%PhoenixTrello.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias PhoenixTrello.Repo
alias PhoenixTrello.User
alias PhoenixTrello.Board

[
  %{
    username: "codesign",
    display_name: "Codesign",
    email: "cs@cs.dev",
    password: "test"
  },
  %{
    username: "test",
    display_name: "Test",
    email: "test@example.com",
    password: "test"
  },
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert!(&1))

[
  %{
    name: "Test Board",
    user_id: 1
  },
]
|> Enum.map(&Board.changeset(%Board{}, &1))
|> Enum.each(&Repo.insert!(&1))
