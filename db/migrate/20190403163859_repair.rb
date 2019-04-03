class Repair < ActiveRecord::Migration[5.2]
  def change
  	add_column :edges, :target_node_id, :integer
  	add_column :metric_values, :node_id, :integer
  	add_column :metric_operations, :edge_id, :integer
  	add_column :nodes, :edge_id, :integer
  	add_column :metric_values, :name, :string

  end
end
