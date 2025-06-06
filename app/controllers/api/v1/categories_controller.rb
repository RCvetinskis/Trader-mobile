class Api::V1::CategoriesController < ApplicationController
  before_action :authorize!

  def index
     top_level_categories = Category.where(parent_id: nil)
      render json: top_level_categories
  end


  def sub_categories
      sub_categories = Category.where(parent_id: params[:parent_id])

     render json: sub_categories
  end
end
