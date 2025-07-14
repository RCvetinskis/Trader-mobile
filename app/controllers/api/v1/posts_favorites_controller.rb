class Api::V1::PostsFavoritesController < ApplicationController
  # before_action :authorize!, only: %i[index create update destroy]
  before_action :set_post, only: %i[create destroy]

  def create
    post_favorite = @post.post_favorites.find_or_create_by(user: current_user)

    if post_favorite.save
      render json: { message: "Succesfully saved post." }, status: :created
    else
      render json: post_favorite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    post_favorites = @post.post_favorites.find_by(user: current_user)
    if post_favorites.destroy
       render json: { message: "Succesfully removed post." }
    else
       render json: { error: "Favorite not found or couldn't be removed." }, status: :unprocessable_entity
    end
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end
end
