# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_trello,
  ecto_repos: [PhoenixTrello.Repo]

# Configures the endpoint
config :phoenix_trello, PhoenixTrello.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "paJIkqqdVtJ1au+Cu/bWYBdqKZA7/qQqi3Tq161Ol0KqftJqpMCQifRdbgvk6oJl",
  render_errors: [view: PhoenixTrello.ErrorView, accepts: ~w(json)],
  pubsub: [name: PhoenixTrello.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure Guardian
config :guardian, Guardian,
  issuer: "PhoenixTrello",
  ttl: {3, :days},
  verify_issuer: true,
  secret_key: "gD8F1vfD4zU+E7Ci6roG45/yS9tDAjvrU/m6VhPc9IHO5EYBoIxi2qoCacpuztgu",
  serializer: PhoenixTrello.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
