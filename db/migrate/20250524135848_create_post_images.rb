class CreatePostImages < ActiveRecord::Migration[8.0]
  def change
    create_table :post_images do |t|
      t.references :post, null: false, foreign_key: true
      t.text :image_data

      t.timestamps
    end
  end
end
