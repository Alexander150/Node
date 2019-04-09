class Node < ApplicationRecord
  has_many :metric_values
  has_many :metrics, :through => :metric_values
  has_many :edges

  default_scope { order(id: :asc) }
end
