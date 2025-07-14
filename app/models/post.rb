class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many :post_favorites, dependent: :destroy
  has_many :favorite_users, through: :post_favorites, source: :user

  has_many_attached :images

  validates :category, presence: true
  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :trade, inclusion: { in: [ true, false ] }, allow_nil: true

  validate :price_or_trade_required

  scope :search_by_title, ->(query) {
    where("LOWER(title) LIKE ?", "%#{query.to_s.downcase}%") if query.present?
  }

  scope :most_favorited, -> {
  left_joins(:post_favorites)
    .group("posts.id")
    .order("COUNT(post_favorites.id) DESC")
  }

   private

  def price_or_trade_required
    if price.blank? && trade != true
      errors.add(:base, "Either price or trade must be present.")
    end
  end
end
