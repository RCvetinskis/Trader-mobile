class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable, :recoverable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :posts, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :post_favorites, dependent: :destroy
  has_many :favorite_posts, through: :post_favorites, source: :post

  validates :name, presence: true, uniqueness: true, length: { maximum: 50 }
end
