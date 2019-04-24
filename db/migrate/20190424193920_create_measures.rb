class CreateMeasures < ActiveRecord::Migration[5.2]
  def change
    create_table :measures do |t|
      t.string :name
      t.string :class_name

      t.timestamps
    end
  end
end
