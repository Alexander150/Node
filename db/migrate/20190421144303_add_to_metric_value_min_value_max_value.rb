class AddToMetricValueMinValueMaxValue < ActiveRecord::Migration[5.2]
  def change
  	add_column :metric_values, :min_value, :string
  	add_column :metric_values, :max_value, :string
  end
end
