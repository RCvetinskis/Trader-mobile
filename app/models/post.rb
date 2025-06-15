class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many_attached :images

  validates :category, presence: true
  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :trade, inclusion: { in: [ true, false ] }, allow_nil: true

  validate :price_or_trade_required

   private

  def price_or_trade_required
    if price.blank? && trade != true
      errors.add(:base, "Either price or trade must be present.")
    end
  end
end
