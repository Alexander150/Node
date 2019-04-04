class CreateMetricValues < ActiveRecord::Migration[5.2]
  def change
    create_table :metric_values do |t|
      t.references :metrics, foreign_key: true
      t.integer :value

      t.timestamps
    end
  end
end
