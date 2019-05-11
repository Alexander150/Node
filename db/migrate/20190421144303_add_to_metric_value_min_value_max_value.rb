class AddToMetricValueMinValueMaxValue < ActiveRecord::Migration[5.2]
  def change
  	add_column :metrics, :min_value, :string
  	add_column :metrics, :max_value, :string
  end
end
