class CreateCons < ActiveRecord::Migration[5.0]
  def change
    create_table :cons do |t|
      t.string :string
      t.integer :points
    end
  end
end
