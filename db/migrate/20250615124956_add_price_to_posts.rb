class AddPriceToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :price, :decimal, precision: 10, scale: 2
    add_column :posts, :trade, :boolean
  end
end
