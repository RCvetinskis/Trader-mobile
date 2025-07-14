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
      resources :posts do
         collection do
          get :current_user_posts
          get :most_favorited_posts
        end
        member do
          post :favorite, to: "posts_favorites#create"
          delete :favorite, to: "posts_favorites#destroy"
        end
      end

      resources :categories do
        collection do
           get :sub_categories
        end
      end
    end
  end
end
