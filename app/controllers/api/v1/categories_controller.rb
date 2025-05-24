class Api::V1::CategoriesController < ApplicationController
  before_action :authorize!

  def index
    # categories
    # binding.pry
    render json: Category.all
  end
end
