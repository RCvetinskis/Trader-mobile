Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root "posts#index"

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }, defaults: { format: :json }

  namespace :users do
    post "token/refresh", to: "token#refresh"
  end

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :categories do
      get "sub_categories", on: :collection
    end
    end
  end
end
