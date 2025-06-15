class Api::V1::PostsController < ApplicationController
  # before_action :authorize!, only: %i[index create update destroy]
  before_action :set_post, only: %i[ show update destroy ]

# GET /posts
def index
  posts = Post.order(created_at: :desc)

  if params[:category_id].present?
    category = Category.find_by(id: params[:category_id])

    if category.present?
      if category.subcategories.any?

        subcategory_ids = category.subcategories.pluck(:id)
        posts = posts.where(category_id: subcategory_ids)
      else
        posts = posts.where(category_id: category.id)
      end
    end
  end

  posts = posts.page(params[:page]).per(10)

  render json: posts, each_serializer: PostSerializer, meta: pagination_dict(posts)
end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.user = current_user
    if @post.save
      render json: { message: "Succesfully created post." }, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :description, :price, :trade, :category_id, images: [])
    end
end
