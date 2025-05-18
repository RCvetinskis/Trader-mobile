Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root "posts#index"

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }, defaults: { format: :json }

  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end
end
