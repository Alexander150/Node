class Edge < ApplicationRecord
  belongs_to :node
  has_many :metric_operation
  has_one :target_node, class_name: "Node", foreign_key: "target_node_id"
end
