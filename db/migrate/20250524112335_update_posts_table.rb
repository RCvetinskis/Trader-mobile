class UpdatePostsTable < ActiveRecord::Migration[8.0]
  def change
     remove_column :posts, :body, :text

     add_column :posts, :description, :text

     add_reference :posts, :user, null: false, foreign_key: true
  end
end
