class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.integer :pro_id
      t.integer :con_id
      t.integer :points, :default => 0

      t.timestamps
    end
  end
end
