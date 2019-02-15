class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false, index: true, unique: true
      t.timestamps null: false
    end
    # add_index :groups, :name, unique: true
  end
end
