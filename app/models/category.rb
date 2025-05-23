class Category < ApplicationRecord
  belongs_to :user
  belongs_to :parent, class_name: "Category", optional: true

  has_many :subcategories, class_name: "Category", foreign_key: "parent_id", dependent: :destroy

  validates :name, presence: true
end
