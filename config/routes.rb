Rails.application.routes.draw do
  get 'reminders/new'

  get 'reminders/create'

  get 'reminders/edit'

  get 'reminders/delete'

  post 'customers/show'
  post 'customers/create'
  post 'customers/activate'
  post 'customers/update'
  post 'customers/find'

  post 'appointments/get_monthly_summaries'
  post 'appointments/get_daily_free_slots'
  post 'appointments/get_appointments_for_customer'
  post 'appointments/show'
  post 'appointments/get_daily'
  post 'appointments/create'
  post 'appointments/update'
  post 'appointments/cancel'

  get 'doctors/activate'

  get 'accounts/login'

  get 'accounts/logout'

  get 'accounts/activate'

  get 'accounts/reset_password'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
