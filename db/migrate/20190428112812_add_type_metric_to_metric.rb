class AddTypeMetricToMetric < ActiveRecord::Migration[5.2]
  def up
  	remove_column :metrics, :type_metric
  	add_column :metrics, :type_metric, :integer
  end
  def down
  	remove_column :metrics, :type_metric
  	add_column :metrics, :type_metric, :string
  end
end
