
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star } from 'lucide-react';
import { toast } from 'sonner';
import { featuredArtisans } from '@/data/marketplaceData';

export default function ArtisanProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the artisan from the marketplace data
  const artisan = featuredArtisans.find(a => a.id === Number(id));

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] to-[#F8EDE3] flex items-center justify-center">
        <p className="text-[#E86C4F]">Artisan not found</p>
      </div>
    );
  }

  const handleAddToWishlist = (productName: string) => {
    toast.success(`${productName} added to your wishlist`);
  };

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to your cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] to-[#F8EDE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          className="mb-6 border-[#E86C4F] text-[#E86C4F] hover:bg-[#E86C4F] hover:text-white" 
          onClick={() => navigate('/marketplace')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </Button>

        {/* Artisan Profile */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-[#E86C4F]/20">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#2D3436] mb-2">{artisan.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{artisan.specialty}</p>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 fill-[#E86C4F] text-[#E86C4F]" />
                <span className="text-lg">{artisan.rating} rating</span>
                <span className="mx-2">•</span>
                <span className="text-lg">{artisan.productCount} products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan's Products */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#2D3436] mb-6">Products by {artisan.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisan.products.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-[#2D3436]">{product.name}</h3>
                  <p className="text-[#E86C4F] font-bold mt-2">₹{product.price.toLocaleString('en-IN')}</p>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      className="flex-1 bg-[#E86C4F] hover:bg-[#d55d41] text-white"
                      onClick={() => handleAddToCart(product.name)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
