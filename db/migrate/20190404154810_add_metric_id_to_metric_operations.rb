class AddMetricIdToMetricOperations < ActiveRecord::Migration[5.2]
  def change
    add_column :metric_operations, :metric_id, :integer
  end
end
