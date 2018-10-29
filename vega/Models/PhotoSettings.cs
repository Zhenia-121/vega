using System.IO;
using System.Linq;

namespace vega.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }

        public string[] AcceptedPhotoTypes { get; set; }

        public bool isSupported(string fileName) => AcceptedPhotoTypes.Contains(Path.GetExtension(fileName).ToLower());

    }
}