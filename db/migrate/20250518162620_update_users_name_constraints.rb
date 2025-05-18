class UpdateUsersNameConstraints < ActiveRecord::Migration[8.0]
  def change
    change_column :users, :name, :string, limit: 50


    add_index :users, :name, unique: true
  end
end
