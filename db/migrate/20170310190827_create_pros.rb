class CreatePros < ActiveRecord::Migration[5.0]
  def change
    create_table :pros do |t|
      t.string :string
      t.integer :points
    end
  end
end
