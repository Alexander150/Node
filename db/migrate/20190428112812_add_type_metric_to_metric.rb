class AddTypeMetricToMetric < ActiveRecord::Migration[5.2]
  def change
  	remove_column :metrics, :type_metric
  	add_column :metrics, :type_metric, :integer
  end
end
