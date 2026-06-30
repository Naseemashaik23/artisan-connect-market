
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { featuredArtisans, categories, featuredProducts } from '@/data/marketplaceData';

export default function Marketplace() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddToWishlist = (productName: string) => {
    toast.success(`${productName} added to your wishlist`);
  };

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to your cart`);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleArtisanClick = (artisanId: number) => {
    navigate(`/artisan/${artisanId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] to-[#F8EDE3]">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#E86C4F] to-[#d55d41] bg-clip-text text-transparent">
              CraftConnect
            </h1>
            <Button 
              onClick={handleLogout}
              variant="ghost"
              className="text-[#E86C4F] hover:text-[#d55d41] hover:bg-[#FDF8F3]"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2D3436] to-[#474F51] bg-clip-text text-transparent">
            Featured Artisans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredArtisans.map((artisan) => (
              <Card 
                key={artisan.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-[#E86C4F]/10"
              >
                <div className="p-4 text-center">
                  <div className="mx-auto mb-3 w-24 h-24 relative rounded-full overflow-hidden ring-2 ring-[#E86C4F]/20">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-[#2D3436]">{artisan.name}</h3>
                  <p className="text-gray-600 text-sm">{artisan.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-[#E86C4F] text-[#E86C4F]" />
                    <span className="text-sm text-gray-600">{artisan.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{artisan.productCount} products</p>
                  <Button
                    onClick={() => handleArtisanClick(artisan.id)}
                    className="mt-4 w-full bg-[#E86C4F] hover:bg-[#d55d41] text-white"
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2D3436] to-[#474F51] bg-clip-text text-transparent">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2D3436] to-[#474F51] bg-clip-text text-transparent">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm"
              >
                <div className="relative aspect-square" onClick={() => handleProductClick(product.id)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWishlist(product.name);
                    }}
                  >
                    <Heart className="w-5 h-5 text-[#E86C4F]" />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-[#2D3436] group-hover:text-[#E86C4F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">by {product.artisan}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#E86C4F] font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#E86C4F] text-[#E86C4F]" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-[#E86C4F] text-[#E86C4F] hover:bg-[#E86C4F] hover:text-white transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.name);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
