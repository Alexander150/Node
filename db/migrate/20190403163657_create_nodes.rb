class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.references :metric_value, foreign_key: true
      t.string :name
      t.text :body

      t.timestamps
    end
  end
end
