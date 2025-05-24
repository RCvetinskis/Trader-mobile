class CreateCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :categories do |t|
      t.string :name, null: false

      t.references :parent, foreign_key: { to_table: :categories }, index: true, null: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
