class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many_attached :images

  validates :category, presence: true
  validates :title, presence: true
end
