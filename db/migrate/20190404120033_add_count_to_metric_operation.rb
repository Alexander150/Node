class AddCountToMetricOperation < ActiveRecord::Migration[5.2]
  def change
  	add_column :metric_operations, :value, :integer
  end
end
