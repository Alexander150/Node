class Edge < ApplicationRecord
  belongs_to :node
  has_many :metric_operations
  has_one :target_node, class_name: "Node", foreign_key: "target_node_id"
  # has_many :metrics, :through => :metric_operations, :through => :metric_values

  default_scope { order(id: :asc) }
end
