class CreateMetricOperations < ActiveRecord::Migration[5.2]
  def change
    create_table :metric_operations do |t|
      t.references :metric, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
