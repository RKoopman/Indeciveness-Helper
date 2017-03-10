class CreateQuestion < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.integer :pro_id
      t.integer :con_id
      t.0 :value
    end
  end
end
